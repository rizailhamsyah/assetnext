import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody, LayoutHeader } from '@/components/custom/layout'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { FormAddLocation } from './components/add-location'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { fetchGetAsset } from '@/service/api'
import { useEffect, useState } from 'react'

const queryClient = new QueryClient()
const fetchLocation = async () => {
    const response = await fetchGetAsset('lokasi');
    if (!response) {
      throw new Error('Something went wrong...');
    }
    return response;
};

const Index = () => {
  const { data: location } = useQuery({ queryKey: ['location'], queryFn: fetchLocation });
  const [data, setData] = useState([])
  useEffect(() => {
      setData(location)
  }, [location])
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
            <h2 className='text-2xl font-bold tracking-tight'>Lokasi</h2>
            <p className='text-muted-foreground'>
              Daftar Lokasi
            </p>
          </div>
          <div>
            <FormAddLocation />
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={data || []} columns={columns} />
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
