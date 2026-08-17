import { supabase } from './supabase.js';

/**
 * Sends a notification
 * @param {string} senderId
 * @param {string} title
 * @param {string} message
 * @param {string} targetType 'all' or 'specific'
 * @param {string} [targetUserId] Required if targetType is 'specific'
 * @returns {Promise<{data: any, error: any}>}
 */
export async function sendNotification(senderId, title, message, targetType, targetUserId = null) {
  try {
    const payload = {
      sender_id: senderId,
      title,
      message,
      target_type: targetType,
      target_user_id: targetUserId
    };
    
    const { data, error } = await supabase
      .from('notifications')
      .insert([payload])
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error sending notification:', error);
    return { data: null, error };
  }
}

/**
 * Gets notifications for a user (both specific and broadcast)
 * @param {string} userId
 * @returns {Promise<Array>}
 */
export async function getNotifications(userId) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select(`
        *,
        user_notifications!left(read_at)
      `)
      .or(`target_type.eq.all,target_user_id.eq.${userId}`)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    return (data || []).map(n => ({
      ...n,
      is_read: n.user_notifications && n.user_notifications.length > 0 && n.user_notifications[0].read_at !== null
    }));
  } catch (error) {
    console.error('Error getting notifications:', error);
    return [];
  }
}

/**
 * Marks notification as read
 * @param {string|number} notificationId
 * @returns {Promise<{error: any}>}
 */
export async function markAsRead(notificationId) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    if (!userId) throw new Error('Not authenticated');

    const { error } = await supabase
      .from('user_notifications')
      .upsert([
        {
          notification_id: notificationId,
          user_id: userId,
          read_at: new Date().toISOString()
        }
      ], { onConflict: 'user_id,notification_id' });
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return { error };
  }
}

/**
 * Gets unread notification count
 * @param {string} userId
 * @returns {Promise<number>}
 */
export async function getUnreadCount(userId) {
  try {
    const notifications = await getNotifications(userId);
    return notifications.filter(n => !n.is_read).length;
  } catch (error) {
    console.error('Error getting unread count:', error);
    return 0;
  }
}

/**
 * Deletes a notification
 * @param {string|number} notificationId
 * @returns {Promise<{error: any}>}
 */
export async function deleteNotification(notificationId) {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);
      
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting notification:', error);
    return { error };
  }
}

/**
 * Gets notifications sent by a teacher
 * @param {string} senderId
 * @returns {Promise<Array>}
 */
export async function getSentNotifications(senderId) {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('sender_id', senderId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting sent notifications:', error);
    return [];
  }
}
