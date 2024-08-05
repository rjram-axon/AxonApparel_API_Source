using AxonApparel.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IGroupProcessOrderBusiness
    {
        Response<IList<Domain.Group_Prod_Prg_Det>> LoadOutputitmsgrid(string closed, string jobordno, string procid);

        Response<IQueryable<Domain.Group_Prod_Prg_Det>> LoadInputitmsgrid(string closed, string jobordno, string procid);

        Response<int> CreateProdMas(Domain.Group_Prod_Prg_Mas ProdMasAdd);
        Response<int> UpdateProdMas(Domain.Group_Prod_Prg_Mas ProdMasAdd);
        Response<int> DeleteProdMas(Domain.Group_Prod_Prg_Mas ProdMasAdd);

        Response<IList<Domain.Group_Prod_Prg_Mas>> LoadMain(int? Ordid, int? Refid, int? Style, int? Process, int? Groupid, string FDt, string TDt);
        Response<IList<Domain.Group_Prod_Prg_Mas>> GetGrpProcMas(int masid);
        Response<IList<Domain.Group_Prod_Prg_Det>> GetIpGrpProc(int masid);
        Response<IList<Domain.Group_Prod_Prg_Det>> GetOpGrpProc(int masid);
        Response<IList<Domain.Group_Prod_Prg_Det>> GetIpPrgdet(int masid);
        Response<IList<Domain.Group_Prod_Prg_Det>> GetOpPrgdet(int masid);
        Response<IList<Domain.StockAudit>> GetGroupDropdwon(int? BMasId, int? JobId, int? Styleid, int? RefNo);
        Response<IList<Domain.StockAudit>> GetProcessDropdwon(int? JobId);
        Response<int> AddGrpProc(Domain.Group_Prod_Prg_Mas Procobj, string procid);
    }
}
