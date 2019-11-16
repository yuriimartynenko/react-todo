
import React from 'react';
import Comment from '../Comment';
import WriteComment from '../WriteComment';

const Comments = ({ selectedItem: { comments }, addComment, handleCommentInput, commentInput }) => (
    <React.Fragment>
        <div className='list__items'>
            {
                comments &&
                comments.map((comment) => <Comment key={comment.id} comment={comment} />)
            }
        </div>
        <WriteComment
            addComment={addComment}
            changeInput={handleCommentInput}
            commentInput={commentInput}
        />
    </React.Fragment>
);
export default Comments;