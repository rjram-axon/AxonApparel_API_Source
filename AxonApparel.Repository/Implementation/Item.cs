using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Implementation
{
    public class Item :IBaseRepository<Item>
    {

        public IQueryable<Item> GetDataList()
        {
            throw new NotImplementedException();
        }

        public Item GetData()
        {
            throw new NotImplementedException();
        }

        public Item GetDataById(int id)
        {
            throw new NotImplementedException();
        }

        public int AddData(Item obj)
        {
            throw new NotImplementedException();
        }

        public bool UpdateData(Item obj)
        {
            throw new NotImplementedException();
        }

        public bool DeleteData(int id)
        {
            throw new NotImplementedException();
        }
    }
}
