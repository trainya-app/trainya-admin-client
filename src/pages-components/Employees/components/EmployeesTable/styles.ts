import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 3.2rem;
  overflow-x: scroll;
  width: 100%;

  table {
    width: 100%;
    border-spacing: 0 1rem;
    overflow-x: scroll;

    th {
      text-align: left;
      padding: 1rem 2rem;
      color: ${({ theme }) => theme.colors.gray[700]};

      div {
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }
    }

    tr {
      &:hover td {
        background: ${({ theme }) => theme.colors.blue[200]};
        cursor: pointer;
      }
    }

    td {
      padding: 2rem 2rem;
      border: 0;
      background-color: ${({ theme }) => theme.colors.white};

      &:first-child {
        border-radius: 0.4rem 0 0 0.4rem;
      }

      &:last-child {
        border-radius: 0 0.4rem 0.4rem 0;
      }

      .center {
        display: flex;
        align-items: center;
        gap: 0.8rem;
      }
    }

    .image {
      position: relative;
      display: inline-block;
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 0.4rem;
      overflow: hidden;
    }
  }
`;

export const ArrowIcon = styled.div<{
  dir: 'asc' | 'desc';
}>`
  cursor: pointer;

  .icon {
    transform: ${({ dir }) =>
      dir === 'asc' ? 'rotate(0deg)' : 'rotate(180deg)'};
  }
`;
