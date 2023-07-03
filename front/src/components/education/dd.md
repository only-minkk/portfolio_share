## 화살표 함수의 유일한 문장이 return일 경우 return과 중괄호 생략 가능

> map(&nbsp; (object)&nbsp; =>&nbsp; {return&nbsp; ~~~&nbsp;}&nbsp; )

> map(&nbsp; (object)&nbsp; =>&nbsp; (&nbsp;&nbsp; ~~~ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )&nbsp; )

> map(&nbsp; (object)&nbsp; =>&nbsp; &nbsp;&nbsp; ~~~ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; )

---

---

## 파라미터가 하나만 있을 때는 주변 괄호 생략 가능

> map(&nbsp; object&nbsp; =>&nbsp; {return&nbsp; ~~~&nbsp;}&nbsp; )

> map(&nbsp; object&nbsp; =>&nbsp; (&nbsp;&nbsp; ~~~ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )&nbsp; )

> map(&nbsp; object&nbsp; =>&nbsp; &nbsp;&nbsp; ~~~ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; )

---

---

## object를 제거하고 this를 사용해서 불러오는게 가능한가?

```javascript
<div key={`inline-radio`} className="mb-3 mt-3">
  {positionList.map((object) => (
    <Form.Check
      inline
      label={object.label}
      id={object.id}
      type="radio"
      value={object.label}
      checked={position === object.label}
      onChange={(e) => setPosition(e.target.value)}
    />
  ))}
</div>
```

```javascript
<div key={`inline-radio`} className="mb-3 mt-3">
  {positionList.map(
    <Form.Check
      inline
      label={this.label}
      id={this.id}
      type="radio"
      value={this.label}
      checked={position === this.label}
      onChange={(e) => setPosition(e.target.value)}
    />
  )}
</div>
```

> 안됨..
