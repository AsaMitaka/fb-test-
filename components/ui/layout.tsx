import SearchBar from '../searchbar/searchbar';
import Sidebar from '../sidebar/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen bg-white">
      <div className="container h-full mx-auto xl:px-30 max-w-5xl lg:max-w-7xl">
        <div className="grid grid-cols-5 lg:grid-cols-7 h-full">
          <Sidebar />
          <div className="col-span-2 lg:col-span-3 border-x-[1px] border-neutral-800">
            {children}
          </div>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
