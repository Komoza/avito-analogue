import './photos.scss';

export const Photos = () => {
    return (
        <div className="photos">
            <img
                src="./public/image/photo-test-5.jpeg"
                alt=""
                className="photos__main"
            />
            <img
                src="./public/image/photo-test.jpeg"
                alt=""
                className="photos__little photos__little--active"
            />
            <img
                src="./public/image/photo-test-2.jpg"
                alt=""
                className="photos__little"
            />
            <img
                src="./public/image/photo-test-3.jpg"
                alt=""
                className="photos__little"
            />
            <img
                src="./public/image/photo-test-4.jpeg"
                alt=""
                className="photos__little"
            />
            <img
                src="./public/image/photo-test-5.jpeg"
                alt=""
                className="photos__little"
            />
        </div>
    );
};
