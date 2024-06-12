import styled from 'styled-components'

export const DiaryCommentsWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .comment-items-wrapper {
    max-height: 500px;
    overflow: auto;
  }
`
