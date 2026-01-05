-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, slug, email, full_name)
  VALUES (
    NEW.id,  -- auth.users.id
    COALESCE(NEW.raw_user_meta_data->>'slug', split_part(NEW.email, '@', 1)),  -- 使用 slug 或 email 前缀作为默认 slug
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NULL)
  )
  ON CONFLICT (id) DO NOTHING;  -- 如果 profile 已存在，不执行任何操作
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger that fires after a new user is created in auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

