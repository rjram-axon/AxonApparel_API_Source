using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IGroupProcessOrderRepository
    {
        IList<Domain.Group_Prod_Prg_Det> LoadOutputitmsgrid(string closed, string jobordno, string procid);

        IQueryable<Domain.Group_Prod_Prg_Det> LoadInputitmsgrid(string closed, string jobordno, string procid);

        bool AddDetData(Group_Prod_Prg_Mas GrpmasInsert, List<Group_Prod_Prg_Det> IpGrpDetInsert, List<Group_Prod_Prg_Det> OpGrpDetInsert, ProcessProd_Prg_Mas objaddmas, List<ProcessProd_Prg_Det> objCDet, List<ProcessProd_Prg_Det> objopDet, string Mode);
        bool UpdateProdMas(Group_Prod_Prg_Mas GrpmasInsert, List<Group_Prod_Prg_Det> IpGrpDetInsert, List<Group_Prod_Prg_Det> OpGrpDetInsert, ProcessProd_Prg_Mas objaddmas, List<ProcessProd_Prg_Det> objCDet, List<ProcessProd_Prg_Det> objopDet, string Mode);
        bool DeleteProdMas(Group_Prod_Prg_Mas GrpmasInsert, List<Group_Prod_Prg_Det> IpGrpDetInsert, List<Group_Prod_Prg_Det> OpGrpDetInsert, ProcessProd_Prg_Mas objaddmas, List<ProcessProd_Prg_Det> objCDet, List<ProcessProd_Prg_Det> objopDet, string Mode);

        IList<Domain.Group_Prod_Prg_Mas> LoadMain(int? Ordid, int? Refid, int? Style, int? Process, int? Groupid, string FDt, string TDt);
        IList<Domain.Group_Prod_Prg_Mas> GetGrpProcMas(int masid);
        IList<Domain.Group_Prod_Prg_Det> GetIpGrpProc(int masid);
        IList<Domain.Group_Prod_Prg_Det> GetOpGrpProc(int masid);
        IList<Domain.Group_Prod_Prg_Det> GetIpPrgdet(int masid);
        IList<Domain.Group_Prod_Prg_Det> GetOpPrgdet(int masid);
        IList<Domain.StockAudit> GetGroupDropdwon(int? BMasId, int? JobId, int? Styleid, int? RefNo);
        IList<Domain.StockAudit> GetProcessDropdwon(int? JobId);
        int AddGrpProc(List<Domain.Group_Prod_Prg_Det> IpGrpDetInsert, string procid); 
    }
}
