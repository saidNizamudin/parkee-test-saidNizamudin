import { useParams } from 'react-router-dom';
import { css } from '@emotion/css';
import { useState, useEffect } from 'react';
import { getAnime } from '../axios';
import { LoopCircleLoading } from 'react-loadingg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Detail() {
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});

	useEffect(() => {
		getAnime(id)
			.then((res) => {
				setData(res.data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [id]);

	return (
		<div
			className={css`
				margin: 5em;
				height: 100%;
				@media (max-width: 768px) {
					margin: 0.5em;
				}
			`}
		>
			{loading ? (
				<LoopCircleLoading />
			) : (
				<div
					className={css`
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						height: 100%;
						margin-bottom: 1em;
						@media (max-width: 768px) {
							flex-direction: column !important;
							& > div {
								margin: 0.5em;
							}
						}
					`}
				>
					<img src={data.attributes.posterImage.medium} />
					<div
						className={css`
							margin-left: 2em;
							display: flex;
							flex-direction: column;
							align-items: flex-start;
							& > div {
								display: flex;
								flex-direction: column;
								align-items: flex-start;
								margin-bottom: 1em;
							}
							& div > strong {
								font-size: 1.5em;
							}
							& div > span {
								font-size: 1em;
							}
							& div:nth-child(3) > span {
								font-size: 0.8em;
								text-align: justify;
							}
						`}
					>
						<div>
							<strong>Title</strong>
							<span>
								{data.attributes.titles.en_jp ? data.attributes.titles.en : 'Unknown Title'}
							</span>
						</div>
						<div>
							<strong>Japanese Title</strong>
							<span>
								{data.attributes.titles.ja_jp ? data.attributes.titles.ja_jp : 'Unknown Title'}
							</span>
						</div>
						<div>
							<strong>Synopsis</strong>
							<span>
								{data.attributes.synopsis ? data.attributes.synopsis : 'Unknown Synopsis'}
							</span>
						</div>
						<div>
							<strong>Rating</strong>
							<span>
								{data.attributes.averageRating ? data.attributes.averageRating : 'Unknown Rating'}
							</span>
						</div>
						<div>
							<strong>Age Rating</strong>
							<span>
								{data.attributes.ageRating ? data.attributes.ageRating : 'Unknown Age Rating'}
							</span>
						</div>
						<div
							className={css`
								display: flex;
								flex-direction: row !important;s
								align-items: center !important;
								padding: 0.5em;
								border-radius: 0.5em;
								background-color: black;
								color: white;
								cursor: pointer;
								transition: 0.3s all ease-in-out;
								& > span {
									margin-left: 0.5em;
								}
								&:hover {
									background-color: grey;
									color: black;
								}
							`}
							onClick={() => {
								window.location.href = `/`;
							}}
						>
							<FontAwesomeIcon
								icon={faArrowLeft}
								className={css`
									align-self: center;
								`}
							/>
							<span>Back to Anime List</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
