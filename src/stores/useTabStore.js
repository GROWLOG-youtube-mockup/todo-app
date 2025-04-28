// 프로필 페이지 내 [할 일 기록, 게시물] 탭 상태관리
import { create } from 'zustand';

const useTabStore = create((set) => ({
  currentTab: '할 일', // 초기 탭 설정
  setCurrentTab: (tab) => set({ currentTab: tab }),

  loadedTodoCount: 5,
  loadMoreTodos: () =>
    set((state) => ({
      loadedTodoCount: state.loadedTodoCount + 5
    }))
}));

export default useTabStore;
