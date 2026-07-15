-- Articles table structure
CREATE TABLE IF NOT EXISTS public.articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT,
    image_url TEXT,
    category TEXT,
    author TEXT,
    published_at TIMESTAMPTZ,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to published articles
CREATE POLICY "Allow public read access to published articles" 
ON public.articles FOR SELECT 
TO PUBLIC 
USING (is_published = true);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at 
BEFORE UPDATE ON public.articles 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();