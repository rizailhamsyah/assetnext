import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { FormAddCategory } from './components/add-category'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { fetchGetAsset } from '@/service/api'
import { useEffect, useState } from 'react'

const queryClient = new QueryClient()
const fetchKategori = async () => {
    const response = await fetchGetAsset('kategori');
    if (!response) {
      throw new Error('Something went wrong...');
    }
    return response;
};    

const Index = () => {
  const { data: category } = useQuery({ queryKey: ['category'], queryFn: fetchKategori });
  const [data, setData] = useState([])
  useEffect(() => {
      setData(category)
  }, [category])
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className='flex flex-col' fixedHeight>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Kategori Asset</h2>
            <p className='text-muted-foreground'>
              Daftar Data Kategori Asset
            </p>
          </div>
          <div>
            <FormAddCategory />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={data} columns={columns} />
        </div>
      </LayoutBody>
    </Layout>
  )
}

function App() {
	return (
        <>
          <QueryClientProvider client={queryClient}>
            <Index />
          </QueryClientProvider>
        </>
	    )
}

export default App;
