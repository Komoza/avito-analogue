import { useEffect, useRef, useState } from 'react';
import { BackgorundDark } from '../../../../components/background-dark/background-dark';
import { Comments } from '../../../../interface/global';
import './commets.scss';
import { host } from '../../../../constant';
import { Link, useParams } from 'react-router-dom';
import { ru } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/actions/types/types';
import { postComments } from '../../../../api/ads';
import { getTokenFromLocalStorage } from '../../../../utils/token';

interface CommentsWindowProps {
    comments: Comments[];
    setIsCommetnsWindow: (value: boolean) => void;
    sellerId: number;
    setComments: (value: Comments[]) => void;
}

export const CommentsWindow: React.FC<CommentsWindowProps> = ({
    comments,
    setIsCommetnsWindow,
    sellerId,
    setComments,
}) => {
    const [isNotActiveButton, setIsNotActiveButton] = useState<boolean>(true);
    const userIdState = useSelector(
        (state: RootState) => state.otherState.userId
    );
    const asdId = useParams();

    const refTextarea = useRef<HTMLTextAreaElement | null>(null);

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

        if (asdId.id && refTextarea.current) {
            postComments(
                parseInt(asdId.id),
                refTextarea.current.value,
                getTokenFromLocalStorage()
            )
                .then((data) => {
                    setComments([data, ...comments]);
                    if (refTextarea.current) {
                        refTextarea.current.value = '';
                        setIsNotActiveButton(true);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
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
                {!userIdState ? (
                    <p className="comments__guest-mode">
                        Чтобы оставить отзыв необходимо войти в аккаунт
                    </p>
                ) : (
                    <div className="comments__feedback">
                        <p className="comments__add-text">Добавить отзыв</p>
                        <textarea
                            ref={refTextarea}
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
                )}

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

                                            {sellerId === comment.author.id && (
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
                    <p className="comment__empty-arr">Отзывов нет</p>
                )}
            </div>
        </div>
    );
};
