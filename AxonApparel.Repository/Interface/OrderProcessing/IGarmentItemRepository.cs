using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace AxonApparel.Repository
{
    public interface IGarmentItemRepository
    {
        IEnumerable<Ord_styleTempMas> GetDllList();
        IQueryable<Domain.Ord_styleTempDet> GetStyleTemp(int id);
        bool DeleteData(int id);
        bool UpdateData(Repository.Ord_styleTempMas objUpd);
        IQueryable<Domain.Ord_styleTempDet> GetOrderStyleTemp(int id);
        bool AddData(Ord_styleTempMas objAdd);
        IQueryable<BuyOrderStyle> GetGarmentOrderNo(int BMasId);
        IQueryable<BuyOrderStyle> GetDataRepList(int buyormasid);
        IQueryable<Domain.Ord_styleTempDet> GetDataRepCheckTempOrderDetails(int tempid, int tempdetid);
    }
}
