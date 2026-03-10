import PageHeader from "../components/PageHeader";

export default function About() {
  return (
    <div className="container">
      <PageHeader
        title="About"
        description="フロントエンドエンジニアを目指して
                    Reactを中心に学習しています。"
      />
      <p>
        JavaScript / React / Git
      </p>

    </div>
  );
}