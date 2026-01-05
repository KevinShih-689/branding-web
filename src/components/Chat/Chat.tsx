'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { UIMessage, DefaultChatTransport } from 'ai';
import Fab from '@mui/material/Fab';
import ForumIcon from '@mui/icons-material/Forum';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import { Bot, UserRound } from 'lucide-react';

const Chat = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const theme = useTheme();
  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/v1/chat',
    }),
  });

  console.log('🚀 ~ Chat ~ messages:', messages);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <Fab color='primary' size='large' aria-label='chat' onClick={() => setOpen(true)}>
        <ForumIcon fontSize='large' sx={{ color: 'var(--background-default)' }} />
      </Fab>
      <Drawer
        anchor={isMobile ? 'bottom' : 'right'}
        open={open}
        onClose={() => setOpen(false)}
        keepMounted={false}
        classes={{
          paper:
            'bg-background-section/30! backdrop-blur-xl! border-l border-background-section/30! shadow-2xl! w-full md:w-[400px] h-[85vh]! md:h-full! rounded-t-2xl md:rounded-none',
        }}
        transitionDuration={500}
      >
        <div className='flex flex-col gap-6 px-[16px] py-[24px]'>
          {messages.map((message: UIMessage) => (
            <div
              key={message.id}
              className={`flex flex-row${message.role === 'user' ? '-reverse' : ''} items-center justify-${message.role === 'user' ? 'end' : 'start'} gap-4 whitespace-pre-wrap`}
            >
              {message.role === 'user' ? (
                <Avatar sizes='small' variant='circular' className='bg-primary-dark!'>
                  <UserRound className='stroke-background-paper' />
                </Avatar>
              ) : (
                <Avatar sizes='small' variant='circular' className='bg-secondary-main!'>
                  <Bot className='stroke-background-paper' />
                </Avatar>
              )}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return (
                      <div key={`${message.id}-${i}`} className={`text-${message.role === 'user' ? 'end' : 'start'}`}>
                        {part.text}
                      </div>
                    );
                }
              })}
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage({ text: input });
            setInput('');
          }}
        >
          <input
            className='fixed bottom-0 mb-8 w-full max-w-md rounded border border-zinc-300 p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900'
            value={input}
            placeholder='Say something...'
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      </Drawer>
    </>
  );
};

export default Chat;
