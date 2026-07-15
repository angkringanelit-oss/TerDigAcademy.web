-- Test function for articles API
-- This function can be used to verify that the articles table is properly set up
-- and that the RLS policies are working correctly

-- Test 1: Check if articles table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name = 'articles'
) as table_exists;

-- Test 2: Check if sample articles exist
SELECT COUNT(*) as article_count FROM public.articles;

-- Test 3: Check if published articles are accessible
SELECT COUNT(*) as published_article_count 
FROM public.articles 
WHERE is_published = true;

-- Test 4: Check if unpublished articles are not accessible (RLS test)
-- This test requires a non-authenticated connection to verify RLS
-- For authenticated users, they might still see unpublished articles depending on policies

-- Test 5: Check article structure
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' 
AND table_name = 'articles'
ORDER BY ordinal_position;

-- Test 6: Check RLS status
SELECT 
    tablename,
    relname,
    relrowsecurity,
    relforcerowsecurity
FROM pg_class pc
JOIN pg_namespace pn ON pc.relnamespace = pn.oid
WHERE pn.nspname = 'public' 
AND pc.relname = 'articles';

-- Test 7: Check policies
SELECT 
    polname,
    polrelid::regclass,
    polcmd,
    polqual,
    polwithcheck
FROM pg_policy
WHERE polrelid = 'public.articles'::regclass;

-- Test 8: Sample query to verify data integrity
SELECT 
    id,
    title,
    slug,
    category,
    is_published
FROM public.articles
WHERE is_published = true
ORDER BY published_at DESC
LIMIT 5;