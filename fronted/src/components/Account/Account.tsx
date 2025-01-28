import { useRef } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import Folder from "../../assets/folder40.svg?react";

export default function Account() {
  const dropArea = useRef<HTMLDivElement | null>(null);

  const dragenter: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (dropArea !== null) {
      dropArea.current?.classList.add("drop-active");
    }

    console.log(e);
  };

  function dragleave(e: React.DragEvent) {
    e.stopPropagation();
    e.preventDefault();

    if (dropArea !== null) {
      dropArea.current?.classList.remove("drop-active");
    }
    return false;
  }

  function dragover(e: React.DragEvent) {
    e.stopPropagation();
    e.preventDefault();

    return false;
  }

  function drop(e: React.DragEvent) {
    e.stopPropagation();
    e.preventDefault();

    const dt = e.dataTransfer;
    const files = dt.files;

    console.log(files);
    return false;
  }

  const clickCreateBtnHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const body = document.body;

    const modal = `
      <Container
        className=" position-absolute bg-body-secondary z-2"
        style={{ width: "100vw", height: "100%" }}
      >
        <Form>
          <Form.Group>
            <Form.Label>Укажите название папки</Form.Label>
            <Form.Control type="text" value={"Новая папка"} />
          </Form.Group>
        </Form>
      </Container>
      `;

    body.insertAdjacentHTML("beforeend", modal);
  };

  return (
    <Container className="disk-page position-relative">
      <Row>
        <Col xl={3}>
          <Container className="left-column">
            <Button onClick={clickCreateBtnHandler}>Создать</Button>
            <Button>Загрузить</Button>

            <ListGroup>
              <ListGroup.Item>Файлы</ListGroup.Item>
              <ListGroup.Item>Загрузки</ListGroup.Item>

              <ListGroup.Item>Корзина</ListGroup.Item>
            </ListGroup>
          </Container>
        </Col>

        <Col>
          <Container>
            <Row>
              <Col>Иконка файла</Col>
              <Col>Название</Col>
              <Col>Дата создания</Col>
              <Col>Размер файла</Col>
            </Row>
          </Container>

          <Container
            className="border"
            style={{ minHeight: "100vh" }}
            ref={dropArea}
            onDragOver={(e) => dragover(e)}
            onDragLeave={dragleave}
            onDragEnter={dragenter}
            onDrop={drop}
          >
            <Row className="border-bottom border-1 p-2">
              <Col>
                <Folder style={{ width: 40 }} />
              </Col>
              <Col>Папка</Col>
              <Col>13.04.23</Col>
              <Col>13мб</Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
