import React from 'react';
import ListItem from './listItem.jsx';

const List = (props) =>  (
  <div className="list">
    <ul>
      {props.posts.map((post, idx) =>
        <ListItem
          key={idx}
          post={post}
          title={post.title}
          description={post.description}
          city={post.city}
          handleClick={props.handleClick}
          state={post.state}/>
      )}
    </ul>
  </div>
)


export default List;
