using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace AxonApparel.Repository
{
    public interface IOrderItemDetailsRepository
    {
        IQueryable<Domain.Ord_styleTempMas> GetDllList();
        IQueryable<Domain.Ord_styleTempDet> GetStyleTemp(int id);
        bool DeleteData(int id);
        bool UpdateData(Domain.OrdCons_Mas OrderitemdetId, List<Domain.OrdCons_ProcSeq> ProcessDet, List<Domain.OrdCons_YarnFab> YarnFabDet);
        IQueryable<Domain.Ord_styleTempDet> GetOrderStyleTemp(int id);
       // bool AddData(OrdCons_Mas objAdd);

        //OrderitemdetId, ProcessDet, YarnFabDet
        bool AddData(Domain.OrdCons_Mas OrderitemdetId, List<Domain.OrdCons_ProcSeq> ProcessDet, List<Domain.OrdCons_YarnFab> YarnFabDet);

        IQueryable<Domain.OrdCons_Mas> GetGarmentOrderNo(int BMasId);
        IQueryable<Domain.OrdCons_ProcSeq> processdet(int conmasid);
        IQueryable<Domain.OrdCons_YarnFab> yarnfabdet(int conmasid);

        IQueryable<BuyOrderStyle> GetDataRepList(int buyormasid);
        IQueryable<Domain.Ord_styleTempDet> GetDataRepCheckTempOrderDetails(int tempid, int tempdetid);
    }
}
