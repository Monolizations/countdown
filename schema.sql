-- Create the last_messages table
CREATE TABLE last_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  
  -- Add constraints
  CONSTRAINT name_not_empty CHECK (LENGTH(TRIM(name)) > 0),
  CONSTRAINT message_not_empty CHECK (LENGTH(TRIM(message)) > 0),
  CONSTRAINT message_max_length CHECK (LENGTH(message) <= 280)
);

-- Create an index on created_at for faster sorting
CREATE INDEX idx_last_messages_created_at ON last_messages(created_at DESC);

-- Set up Row Level Security (RLS)
ALTER TABLE last_messages ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert
CREATE POLICY "Anyone can insert last_messages" ON last_messages
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows anyone to read
CREATE POLICY "Anyone can read last_messages" ON last_messages
  FOR SELECT USING (true);

-- Prevent updates and deletes
CREATE POLICY "No one can update last_messages" ON last_messages
  FOR UPDATE USING (false);

CREATE POLICY "No one can delete last_messages" ON last_messages
  FOR DELETE USING (false);

