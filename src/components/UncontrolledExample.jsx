import { Carousel } from "react-bootstrap";
import ExampleCarouselImage from "./ExampleCarouselImage";
import "bootstrap/dist/css/bootstrap.css";
function UncontrolledExample() {
  return (
    <Carousel fade>
      <Carousel.Item interval={5000}>
        <ExampleCarouselImage text="First slide" />
        <Carousel.Caption>
          <h3>カリスワークスの素晴らしい作品たち</h3>
          <p>
            カリスワーカーたちによる一つ一つ手丁寧に作成された作品を提供しています。
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={5000}>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>個人開発のシステム</h3>
          <p>
            バックエンド開発・フロントエンド開発など、一から作成されております。
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
