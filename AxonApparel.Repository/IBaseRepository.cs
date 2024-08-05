using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IBaseRepository<T> where T : class
    {
        IQueryable<T> GetDataList();
        T GetDataById(int id);
        int AddData(T obj);
        bool UpdateData(T obj);
        bool DeleteData(int id);


    }
    public interface IGeneralFunctionRepository<T> where T : class
    {
        IQueryable<T> GetDataList();
        T GetDataById();
    }
}
