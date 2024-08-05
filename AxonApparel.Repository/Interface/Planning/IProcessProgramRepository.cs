using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IProcessProgramRepository
    {
       // IList<ProcessProgram> GetProcessProgramAdd(int? cmpnyid, int? buyerid, int? cmpnyunitid, string orderno, string refno, string ordertype, string prgmtype, int? mode);

        IList<ProcessProgram> GetProcessProgram(string FromDate, string ToDate, int? CompanyId, int? buyerid, string orderno, int? cmpnyunitid, string refno, string prgmtype, string Ordertype, string DispatchClosed);
        IQueryable<ProductionProgramming> GetProductionProgramming(string JobOrderNo, string Ordertype, string Programtype);
        IQueryable<ProductionProgramming> GetProductionProgrammingEdit(int id);
        IQueryable<ProductionProgramming> GetProductionProgrammingEditOpen(int id);
        IQueryable<ProductionProgramming> GetProductionProgrammingEditOpenmax(int id, int MaxId);
        IQueryable<Process> GetLastProcess(string JobOrderNo);
        IQueryable<Domain.Process> GetLastProcessdllList(string JobOrdNo, int ProdPgmNo);
        IQueryable<IOTableProcess> GetIOTableProcess(string OrderNo, string ioType);
        IQueryable<ProdPrgDet> GetProdprgedit(int prodprgid);
        IQueryable<IOTableProcess> GetProdprgeditlist(int prodprgid);
        IQueryable<IOTableProcess> GetProdprgautolist(int processid,string JobNo);
        IQueryable<IOTableProcess> GetlastProcessPgmList(int ProdPgmNo, string ioType);
        IQueryable<CompPrgDet> GetCompprgeditlist(int prodprgid);
        IQueryable<ProdPrgMas> ChkProcessOrd(int prodprgid);
        int AddProductionprgMas(Prod_Prg_Mas objaddmas);
        bool AddDetData(Prod_Prg_Mas objaddmas,List<Prod_Prg_Det> objCDet, List<Prod_Prg_Det> objopDet, List<Prod_OpenPrg_Remarks> objrem, string Mode, int ProdId = 0);
        bool UpdateProd(Prod_Prg_Mas objAd, List<Prod_Prg_Det> objCDet, List<Prod_Prg_Det> objopDet, List<Prod_OpenPrg_Remarks> objrem, string Mode, int ProdId = 0);
        bool UpdateProdApp(Prod_Prg_Mas objAd, List<Prod_Prg_Det> objCDet, List<Prod_Prg_Det> objopDet, List<Prod_OpenPrg_Remarks> objrem, string Mode, int ProdId = 0);
        int AddComponentprgMas(Comp_prg_mas objaddmas);
        bool AddCompDetData(List<Comp_Prg_det> objCDet, string Mode, int ProdId = 0);
        IQueryable<CompList> GetItem(string JobOrderNo,int styleid,string JoborWrk);
        IQueryable<CompList> GetColor(string JobOrderNo, int styleid, string JoborWrk,int itemid);
        IQueryable<CompList> GetComponent(string JobOrderNo, int styleid, string JoborWrk, int itemid,int colorid);
        IQueryable<CompList> GetComponentDet(string JobOrderNo, int styleid,  int itemid, int colorid,int componentid);
        //bool UpdateProd(Prod_Prg_Mas objAd);
        bool UpdateComp(Comp_prg_mas objAd);
        bool ProdDeleteData(int id);
        bool CompDeleteData(int id);
        IList<ProcessProgram> GetProcessProgramRepAddList(int? compnyid,int? buyerid,int? cmpnyunitid,string orderno,string refno,string ordertype,string prgmtype,int? mode);

        IList<ProdPrgMas> GetDataRepCheckPrgIndDetails(string Job_ord_no, string ProdPrgNo, int ProcessId, int Itemid, int Colorid, int Sizeid);
        IList<ProdPrgMas> GetDataRepCheckPrgOutDetails(string Job_ord_no, string ProdPrgNo, int ProcessId, int Itemid, int Colorid, int Sizeid);
        IQueryable<Process> GetCopyProcessList(string Orderno, int Styleid);
    }
}
