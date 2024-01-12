import './singleAnimeLayout.scss';

const SingleAnimeLayout = () => {
  return (
    <div className="single-anime">
      <div>
        <img src="https://i0.wp.com/www.otakupt.com/wp-content/uploads/2020/03/Imagem-promocional-de-Tensei-shitara-Slime-Datta-Ken-2-1.jpg?resize=696%2C984&ssl=1" alt="anime-img" className="single-anime__img" />
        <div className="single-anime__info">
          <div className="single-anime__score">
            <div className="single-anime__score-title">Score</div>
            <p className="single-anime__score-text">
              <span className='single-anime__score-text single-anime__score-text_bold'>8.11</span> 
              by 596756 users
            </p>
          </div>
          <div className="single-anime__rating">PG-13 - Teens 13 or older</div>
          <div className="single-anime__status">Finished Airing</div>
          <div className="single-anime__genre">
            <div className="single-anime__genre-item">Action</div>
            <div className="single-anime__genre-item">Adventure</div>
            <div className="single-anime__genre-item">Comedy</div>
            <div className="single-anime__genre-item">Fantasy</div>
          </div>
        </div>
      </div>
      <div>
        <div className="single-anime__about">
          <div>
            <div className="single-anime__title-main">Tensei shitara Slime Datta Ken</div>
            <div className="single-anime__title-secondary">That Time I Got Reincarnated as a Slime</div>
          </div>
          <div className="single-anime__release">
            <div>Fall 2018</div>
            <div>24 Episodes</div>
          </div>
        </div>
        <div className="single-anime__descr">
          Thirty-seven-year-old Satoru Mikami is a typical corporate worker, who is perfectly content with his monotonous lifestyle in Tokyo, other than failing to nail down a girlfriend even once throughout his life. In the midst of a casual encounter with his colleague, he falls victim to a random assailant on the streets and is stabbed. However, while succumbing to his injuries, a peculiar voice echoes in his mind, and recites a bunch of commands which the dying man cannot make sense of. When Satoru regains consciousness, he discovers that he has reincarnated as a goop of slime in an unfamiliar realm. In doing so, he acquires newfound skills—notably, the power to devour anything and mimic its appearance and abilities. He then stumbles upon the sealed Catastrophe-level monster "Storm Dragon" Veldora who had been sealed away for the past 300 years for devastating a town to ashes. Sympathetic to his predicament, Satoru befriends him, promising to assist in destroying the seal. In return, Veldora bestows upon him the name Rimuru Tempest to grant him divine protection. Now, liberated from the mundanities of his past life, Rimuru embarks on a fresh journey with a distinct goal in mind. As he grows accustomed to his new physique, his gooey antics ripple throughout the world, gradually altering his fate. Written by MAL Rewrite
        </div>
      </div>
    </div>
  )
}

export default SingleAnimeLayout;