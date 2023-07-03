import "./Board.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState, useEffect } from "react";
import ReactHtmlParser from "html-react-parser";
import * as Api from "../../api";

function Board() {
  const [boardContent, setBoardContent] = useState({
    title: "",
    content: "",
  });

  const [viewContent, setViewContent] = useState([]); // 스테이트에 저장된 내용을 화면에 보여줌.

  useEffect(() => {
    Api.get("boards").then((res) => setViewContent(res.data));
  }, []);

  const submitContent = async () => {
    if (!boardContent.title) {
      alert("제목을 입력해주세요.");
      return;
    } else if (!boardContent.content) {
      alert("내용을 입력해주세요.");
      return;
    }

    await Api.post("board", {
      title: boardContent.title,
      content: boardContent.content,
    });
    setBoardContent({
      title: "",
      content: "",
    });
    //alert("등록 완료");

    const res = await Api.get("boards");
    setViewContent(res.data);
  };
  const handleDelete = async (id) => {
    await Api.delete("boards", id);
    const res = await Api.get("boards");
    setViewContent(res.data);
  };

  const getValue = (e) => {
    // 이벤트가 발생하면 그 이벤트의 객체인 name과 value를 가지고 옴.
    const { name, value } = e.target;
    setBoardContent({
      ...boardContent,
      [name]: value, //궁금해
    });
    // console.log(name, value);
    // console.log(boardContent);
  };

  return (
    <div className="Board">
      <h1>익명 놀이터</h1>
      <div className="board-container">
        {viewContent
          .map((element) => (
            <div className="board-card">
              <div className="board-content">
                <h2>{element.title}</h2>
                <div>{ReactHtmlParser(element.content)}</div>
              </div>
              <button
                className="delete-button"
                onClick={() => {
                  handleDelete(element.id);
                }}
              >
                삭제
              </button>
            </div>
          ))
          .reverse()}
        {/* 게시글 최신순으로 정렬(reverse()활용)  */}
      </div>
      <div className="form-wrapper">
        <input
          className="title-input"
          type="text"
          placeholder="제목"
          onChange={getValue}
          value={boardContent.title}
          name="title"
        />
        <CKEditor
          editor={ClassicEditor}
          data={boardContent.content}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData(); // ckeditor에서는 직접 데이터를 가져올 때 getData()를 사용함
            //console.log({ event, editor, data });
            //console.log(boardContent);
            setBoardContent((current) => {
              return { ...current, content: data };
            });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
      <button
        className="submit-button"
        onClick={submitContent}
        // setViewContent(viewContent.concat({ ...boardContent })); // viewContent값은 직접 변경 불가하므로 push() 대신 concat() 사용
      >
        입력
      </button>
    </div>
  );
}

export default Board;
