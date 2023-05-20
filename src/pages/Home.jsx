import { useState, useEffect } from 'react';
import { getAnimePaginationList } from '../axios';
import { css } from '@emotion/css';
import { LoopCircleLoading } from 'react-loadingg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [limit, setLimit] = useState(10);
	const [offset, setOffset] = useState(0);
	const [data, setData] = useState([]);

	useEffect(() => {
		setLoading(true);
		getAnimePaginationList(limit, offset)
			.then((res) => {
				setData(res.data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [limit, offset]);

	console.log(data);

	return (
		<div
			className={css`
				text-align: center;
				margin: 2em 5em;
				display: flex;
				flex-direction: column;
			`}
		>
			<div
				className={css`
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 1em;
				`}
			>
				<div
					className={css`
						display: flex;
						justify-content: center;
						margin-right: 1em;
						align-items: center;
						color: white;
						background-color: black;
						padding: 1em;
						border-radius: 50px;
						width: fit-content;
						cursor: pointer;
						${offset === 0 &&
						css`
							opacity: 0.5;
							cursor: not-allowed;
						`}
					`}
					onClick={() => {
						if (offset > 0) {
							setOffset(offset - limit);
						}
					}}
				>
					<FontAwesomeIcon icon={faArrowLeft} />
				</div>
				<h1
					className={css`
						font-size: 2em;
						font-weight: bold;
						text-transform: uppercase;
						margin: 0;
					`}
				>
					Anime List
				</h1>
				<div
					className={css`
						display: flex;
						justify-content: center;
						align-items: center;
						margin-left: 1em;
						color: white;
						background-color: black;
						padding: 1em;
						border-radius: 50px;
						width: fit-content;
						cursor: pointer;
					`}
					onClick={() => setOffset(offset + limit)}
				>
					<FontAwesomeIcon icon={faArrowRight} />
				</div>
			</div>
			<div
				className={css`
					width: 100%;
					margin-right: 1.5em;
					display: flex;
					justify-content: center;
					align-items: center;
					margin-bottom: 2em;
					& select {
						border: 2px solid black;
						color: black;
						border-radius: 10px;
						width: fit-content;
						display: flex;
						align-items: center;
						justify-content: center;
						cursor: pointer;
						padding: 0.5em;
					}
					& label {
						margin-right: 1em;
						margin-bottom: 0;
						color: black;
					}
				`}
			>
				<label htmlFor="limit">Anime per page</label>
				<select
					name="limit"
					id="limit"
					onChange={(e) => {
						setLimit(e.target.value);
						setOffset(0);
					}}
				>
					<option value={10}>10</option>
					<option value={15}>15</option>
					<option value={20}>20</option>
				</select>
			</div>
			{loading ? (
				<LoopCircleLoading size="large" color="black" />
			) : (
				<div
					className={css`
						display: flex;
						flex-wrap: wrap;
						justify-content: center;
					`}
				>
					{data.map((item) => (
						<div
							key={item.id}
							className={css`
								display: flex;
								flex-direction: column;
								align-items: center;
								margin: 0.5em;
								border: 3px solid #ededef;
								border-radius: 0.5em;
								padding: 1em;
								cursor: pointer;
								transition: all 0.3s ease-in-out;
								&:hover {
									transform: scale(1.05);
									border: 3px solid black;
								}
								& div {
									display: flex;
									flex-direction: column;
									align-items: center;
									& span {
										margin: 0.5em 0;
									}
								}
								& div > img {
									border-radius: 0.5em;
									margin-bottom: 1em;
								}
								& div > span {
									font-size: 0.8em;
								}
							`}
							onClick={() => {
								window.location.href = `/${item.id}`;
							}}
						>
							<div>
								<img src={item.attributes.posterImage.small} />
								<strong>
									{item.attributes.titles.en_jp ? item.attributes.titles.en_jp : 'Unknown Title'}
								</strong>
								<span>{item.attributes.titles.ja_jp ? item.attributes.titles.ja_jp : '-'}</span>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Home;
