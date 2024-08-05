using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IProcessReceiptRepository
    {
        IQueryable<Domain.ProcessReceiptMas> Getprocess(int cmpid, int cmunitid, string ordtype);
        IQueryable<Domain.ProcessReceiptMas> Getprocessor();
        IQueryable<Domain.ProcessReceiptMas> Getwrkdiv();
        IQueryable<Domain.ProcessReceiptMas> Getissueno(int cmpid, int cmunitid, int processid, int processorid);
        IQueryable<Domain.ProcessReceiptMas> Loadcolor(int cmpid, int cmunitid, int processid, int processorid);
        IQueryable<Domain.ProcessReceiptMas> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed, int colorid, string OrderNo, string ReferNo, int BuyerId);
        IQueryable<Domain.ProcessReceiptDet> LoadItmgrid(string pid);
        IQueryable<Domain.ProcessReceiptJobdet> Loadjobdetgrid(string pid);
        //int AddData(Process_Recpt_Mas objEntry);
        bool AddDetData(Process_Recpt_Mas obj,string transno, List<Process_Recpt_Det> objdet, List<Process_Recpt_Jobdet> objobdet, List<Process_Recpt_Lot> obLotdet, string Mode, int unitmId = 0);
        bool UpdDetData(Process_Recpt_Mas obj, string transno, List<Process_Recpt_Det> objdet, List<Process_Recpt_Jobdet> objobdet,List<Process_Recpt_Lot> obLotdet, string Mode, int unitmId = 0);
        IQueryable<Domain.ProcessReceiptMas> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, string orderno, string refno, int? styleid, int? processorid,int Userid);
        IQueryable<Domain.ProcessReceiptDet> LoadEditItmgrid(int pid);
        IQueryable<Domain.ProcessReceiptJobdet> LoadEditjobdetgrid(int pid);
        IQueryable<Domain.ProcessReceiptDet> ChkDC(string recpt, int pid);
        bool UpdateData(Process_Recpt_Mas objupd);
        bool DeleteDetData(string transno, List<Process_Recpt_Det> objdet, List<Process_Recpt_Jobdet> objobdet, List<Process_Recpt_Lot> obDelLotjobdet, string Mode, int unitmId = 0);
        bool MarkUpRateRecptUpdation(int ProcOrderId);
        IQueryable<Domain.ProcessReceiptJobdet> LoadMainOrderdet(int pid);
        IQueryable<Domain.ProcessReceiptJobdet> LoadMainOrderstkdet(int pid);
        Process_Recpt_Mas CheckRefRep(string DCNo);
        IQueryable<Domain.ProcessReceiptMas> GetDataOrdeRefRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        IQueryable<Domain.ProcessReceiptMas> GetDataStyleRepDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        IQueryable<Domain.ProcessReceiptLot> GetEditLotdetgrid(int pid);

        IEnumerable<Domain.ProcessReceiptMas> Loadaddgrid_Barcode(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed, int colorid, string OrderNo, string ReferNo, int BuyerId);
    }
}
