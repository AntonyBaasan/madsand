import React from 'react';

interface PostContainerProps {
  children: React.ReactNode;
}
const PostContainer: React.FC<PostContainerProps> = ({ children }) => {
  return (
    <div className='grid  grid-cols-1 md:grid-cols-5 '>
      <div></div>
      <div className='col-span-3 p-4'>{children}</div>
      <div></div>
    </div>
  );
};

export default PostContainer;
