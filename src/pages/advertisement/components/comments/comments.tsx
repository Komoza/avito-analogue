import { useEffect, useState } from 'react';
import { BackgorundDark } from '../../../../components/background-dark/background-dark';
import { Comments } from '../../../../interface/global';
import './commets.scss';
import { host } from '../../../../constant';
import { Link, useParams } from 'react-router-dom';
import { ru } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';

interface CommentsWindowProps {
    comments: Comments[];
    setIsCommetnsWindow: (value: boolean) => void;
}

export const CommentsWindow: React.FC<CommentsWindowProps> = ({
    comments,
    setIsCommetnsWindow,
}) => {
    const [isNotActiveButton, setIsNotActiveButton] = useState<boolean>(true);
    const userId = useParams();

    const handleChangeTextarea = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (event.target.value === '') {
            setIsNotActiveButton(true);
            return;
        }

        setIsNotActiveButton(false);
    };

    const handleClickPublish = () => {
        if (isNotActiveButton) {
            return;
        }

        console.log('Отзыв опубликован');
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);
    return (
        <div className="comments-wrap">
            <BackgorundDark closeModal={setIsCommetnsWindow} />
            <div className="comments">
                <p className="comments__title">Отзывы о товаре</p>
                <div className="comments__feedback">
                    <p className="comments__add-text">Добавить отзыв</p>
                    <textarea
                        onChange={(event) => handleChangeTextarea(event)}
                        name="comment"
                        className="comments__add-input"
                        placeholder="Введите отзыв"
                    />
                    <button
                        onClick={handleClickPublish}
                        className={`comments__publish blue-button${
                            isNotActiveButton ? '--not-active' : ''
                        } `}
                    >
                        Опубликовать
                    </button>
                </div>

                {comments.length ? (
                    <div className="comment-wrap">
                        {comments.map((comment, index) => {
                            return (
                                <div key={index} className="comment">
                                    <Link to={`/profile/${comment.author.id}`}>
                                        <img
                                            src={
                                                comment.author.avatar
                                                    ? `${host}/${comment.author.avatar}`
                                                    : '/image/no-avatar.png'
                                            }
                                            alt=""
                                            className="comment__avatar"
                                        />
                                    </Link>

                                    <div className="comment__info">
                                        <div className="comment__user-info">
                                            <Link
                                                to={`/profile/${comment.author.id}`}
                                            >
                                                <p className="comment__name">
                                                    {comment.author.name}
                                                </p>
                                            </Link>
                                            <p className="comment__date">
                                                {format(
                                                    parseISO(
                                                        comment.created_on
                                                    ),
                                                    'd MMMM',
                                                    { locale: ru }
                                                )}
                                            </p>

                                            {userId.id &&
                                                userId.id ==
                                                    comment.author.id.toString() && (
                                                    <p className="comment__seller-tag">
                                                        Продавец
                                                    </p>
                                                )}
                                        </div>
                                        <div className="comment__text-wrap">
                                            <p className="comment__text-title">
                                                Комментарий
                                            </p>
                                            <p className="comment__text">
                                                {comment.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="comment__empty-arr">Добавьте первый отзыв</p>
                )}
            </div>
        </div>
    );
};
