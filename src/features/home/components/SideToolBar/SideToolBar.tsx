import Chat from '@/components/Chat/Chat';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

const SideToolBar = () => {
  return (
    <div className='fixed top-0 right-0 z-50 flex h-screen w-[80px] flex-col items-center justify-between px-2 py-4'>
      <ThemeToggle />
      <Chat />
    </div>
  );
};

export default SideToolBar;
