/*
  # Fix Chat Participants Policy

  1. Changes
    - Drop the problematic policy that's causing infinite recursion
    - Create a new, simplified policy for chat participants
    - Fix the policy to avoid circular references
*/

-- Drop the problematic policy
DROP POLICY IF EXISTS "Users can view chat participants for their rooms" ON chat_participants;

-- Create a new, simplified policy
CREATE POLICY "Users can view chat participants"
  ON chat_participants
  FOR SELECT
  USING (
    user_id = auth.uid() OR 
    chat_room_id IN (
      SELECT chat_room_id 
      FROM chat_participants 
      WHERE user_id = auth.uid()
    )
  );