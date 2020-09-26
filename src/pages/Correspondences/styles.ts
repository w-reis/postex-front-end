import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 95%;
  margin: 47px auto;
  align-items: center;

  & > div {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: flex-start;

    form {
      width: 100%;
      max-width: 392px;
      margin-bottom: 16px;
      display: flex;

      & > div {
        padding: 11px;
      }

      & > button {
        width: 50px;
        margin-left: 8px;
      }
    }

    button {
      height: 47px;
      padding: 11px;
      align-content: flex-end;
      transition: all 0.5s ease;
      width: 100px;
    }

    button:hover {
      background-color: rgb(4, 54, 136);
      color: #ffffff;
    }

    @media (min-width: 994px) {
      form {
        align-self: flex-start;
      }
    }
  }

  table {
    width: 100%;
    margin-bottom: 20px;
    border-collapse: collapse;

    thead th {
      background: #eeeeee;
      vertical-align: bottom;
      font-weight: 600;
    }

    tbody > tr:nth-child(even) > td,
    tbody > tr:nth-child(even) > th {
      background-color: #ffffff;
    }

    th,
    td {
      font-weight: normal;
      font-size: 12px;
      padding: 8px 15px;
      line-height: 20px;
      text-align: left;
      vertical-align: middle;
      border-top: 1px solid #cccccc;
    }

    td:nth-child(-n + 2) {
      width: 5%;
    }
  }

  @media (max-width: 994px) {
    table thead {
      display: none;
    }
    table tr {
      border-bottom: 1px solid #dddddd;
    }
    table td {
      border: 0;
    }
    table td:not(:first-child) {
      display: block;
    }
  }
`;
