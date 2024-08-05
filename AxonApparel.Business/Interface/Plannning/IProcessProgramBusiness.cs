using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public interface IProcessProgramBusiness
    {
       
        Response<IList<ProcessProgram>> GetProcessProgramAddList(int? cmpnyid,int? buyerid,int? cmpnyunitid,string orderno,string refno,string ordertype,string prgmtype,int? mode);
        Response<IList<ProcessProgram>> GetProcessProgram(string FromDate, string ToDate, int? CompanyId, int? buyerid, string orderno, int? cmpnyunitid, string refno, string prgmtype, string Ordertype, string DispatchClosed);
        Response<IQueryable<ProductionProgramming>> GetProductionProgrammingBuss(string JobOrderNo, string Ordertype, string Programtype);
        Response<IQueryable<ProductionProgramming>> GetProductionProgrammingBussEdit(int id);
        Response<IQueryable<ProductionProgramming>> GetProductionProgrammingBussEditOpenmax(int id, int MaxId);
        Response<IQueryable<ProductionProgramming>> GetProductionProgrammingBussEditOpen(int id);
        Response<IQueryable<CompList>> GetItem(string JobOrderNo, int styleid, string JoborWrk);
        Response<IQueryable<CompList>> GetColor(string JobOrderNo, int styleid, string JoborWrk,int itemid);
        Response<IQueryable<CompList>> GetComponent(string JobOrderNo, int styleid, string JoborWrk, int itemid,int colorid);
        Response<IQueryable<CompList>> GetComponentDet(string JobOrderNo, int styleid,  int itemid, int colorid,int componentid);
        Response<IQueryable<Domain.Process>> GetLastProcessBuss(string JobOrderNo);
        Response<IQueryable<Domain.Process>> GetLastProcessdllList(string JobOrdNo, int ProdPgmNo);
        Response<IQueryable<IOTableProcess>> GetIOTableProcessBuss(string OrderNo, string ioType);
        Response<int> CreateProdMas(ProdPrgMas ProdMasAdd);
        Response<int> CreateCompMas(CompPrgMas CompMasAdd);
        Response<bool> UpdateProd(Domain.ProdPrgMas Upd);
        Response<bool> UpdateProdApp(Domain.ProdPrgMas Upd);
        Response<bool> UpdateComp(Domain.CompPrgMas Upd);
        Response<IQueryable<ProdPrgDet>> GetProdprgedit(int prodprgid);
        Response<IQueryable<IOTableProcess>> GetProdprgeditlist(int prodprgid);
        Response<IQueryable<IOTableProcess>> GetProdprgAutolist(int processid,string jobno);
        Response<IQueryable<IOTableProcess>> GetlastProcessPgmList(int ProdPgmNo, string ioType);
        Response<IQueryable<CompPrgDet>> GetCompprgeditlist(int prodprgid);
        Response<bool> DeleteProd(int id);
        Response<bool> DeleteComp(int id);
        Response<IQueryable<ProdPrgMas>> ChkProcessOrd(int prodprgid);
        Response<IList<ProdPrgMas>> GetPrgEntryIndCheckItemDetails(string Job_ord_no, string ProdPrgNo, int ProcessId, int Itemid, int Colorid, int Sizeid);
        Response<IList<ProdPrgMas>> GetPrgEntryOutCheckItemDetails(string Job_ord_no, string ProdPrgNo, int ProcessId, int Itemid, int Colorid, int Sizeid);
        Response<IQueryable<Domain.Process>> GetCopyProcessList(string Orderno, int Styleid);
    }
}
