-- Create workshop_registrations table
CREATE TABLE IF NOT EXISTS workshop_registrations (
    id BIGSERIAL PRIMARY KEY,
    parent_name TEXT NOT NULL,
    child_name TEXT NOT NULL,
    child_age INTEGER NOT NULL,
    whatsapp_number TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS workshop_registrations_created_at_idx ON workshop_registrations (created_at);
CREATE INDEX IF NOT EXISTS workshop_registrations_parent_name_idx ON workshop_registrations (parent_name);
CREATE INDEX IF NOT EXISTS workshop_registrations_child_name_idx ON workshop_registrations (child_name);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_workshop_registrations_updated_at 
    BEFORE UPDATE ON workshop_registrations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();