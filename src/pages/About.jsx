import PageHeader from "../components/PageHeader";

const birthday = {
  year: 1999,
  month: 6,
  date: 22
};

function getAge() {
  let today = new Date();
  let thisYearBirthday = new Date(today.getFullYear(), birthday.month-1, birthday.date);

  let age = today.getFullYear() - birthday.year;

  if(today < thisYearBirthday) {
    age--;
  }

  return age;
}

export default function About() {
  return (
    <div className="container">
      <PageHeader
        title="自己紹介"
        description="フロントエンドエンジニアを目指して
                    Reactを中心に学習しています"
      />
      <p>
        JavaScript / React / Gitなどを今は勉強中
      </p>

      <div>
        
        <h2>私について</h2>
        <div className="about-profile">
          <div className="about-profile-text">
            <ul>
              <li>1999年6月22日生まれの{getAge()}歳</li>
              <li>高校、大学で情報系を学んだのにプログラミング初心者</li>
              <li>ちゃんとした企業に就職できるよう現在プログラミングを勉強中</li>
              <li>趣味はイラストだけどへたくそ</li>
              <li>なんとなくでウェブサイトを開設</li>
            </ul>

          </div>

          <img 
            className="about-profile-image"
            src="naolabs-main.PNG"
            alt="naolabs-main"
          />
        </div>
          <p style={{paddingTop: "20px"}}>
            夢はフロントエンジニアになること！
            <br></br>
            もしくはゲームで飯を食べられるようになること！
            <br></br>
            パソコンはMacbook proのM1チップ、メモリ8GB、SSD256GBで正直メモリも容量もギリギリ！
            <br></br>
            そんな感じで日々の学んだことを書いてます
          </p>
      </div>

    </div>
  );
}
