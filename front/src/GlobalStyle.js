import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
html,
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

body.light-mode {
  background-color: #fff;
  color: #333;
  transition: background-color 0.3s ease;
}

body.dark-mode .card-body {
  background-color: 
#1d2327
;
}

body.dark-mode {
  background-color: #10171d;
  color: #dfdfdf;

  .navbar {
    background-color: #216075;
  }

  .dark-mode-toggle > button {
    color: #999;
    &:last-child {
      color: lightblue;
    }
  }
}

.navbar {
  width: 100%;
  height: 60px;
  background-color:#95d3ff ;
  padding: 1px;
  margin-bottom: 30px;

}



.dark-mode-toggle {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  & > button {
    font-size: 1.2em;
    background: none;
    border: none;
    color: #ffe600;
    cursor: pointer;
    transition: color 0.3s ease;
    &:last-child {
      color: #666;
    }

    &:focus {
      outline: none;
    }
  }
}

.toggle-control {
  position: relative;
  padding: 0 4px;
  display: flex;
  align-items: center;
}

input[type="checkbox"].dmcheck {
  width: 40px;
  height: 10px;
  background: #555;
  position: relative;
  border-radius: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  vertical-align: 2px;
  outline: none;

  &:checked + label {
    left: 30px;
  }

  &:focus-visible {
    outline: solid 2px white;
  }

  & + label {
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transition: all 0.3s ease;
    cursor: pointer;
    position: absolute;
    left: 2px;
    background: #fff;
    opacity: 0.9;
    background-color: #f6f6f6;
  }
}
.nav-link.active{
  background-color: transparent !important;
}

`;

export default GlobalStyle;
