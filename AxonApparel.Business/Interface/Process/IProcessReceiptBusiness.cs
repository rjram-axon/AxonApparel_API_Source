using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IProcessReceiptBusiness
    {
        Response<IQueryable<Domain.ProcessReceiptMas>> Getprocess(int cmpid, int cmunitid, string ordtype);
        Response<IQueryable<Domain.ProcessReceiptMas>> Getprocessor();
        Response<IQueryable<Domain.ProcessReceiptMas>> Getwrkdiv();
        Response<IQueryable<Domain.ProcessReceiptMas>> Getissueno(int cmpid, int cmunitid, int processid, int processorid);
        Response<IQueryable<Domain.ProcessReceiptMas>> Loadcolor(int cmpid, int cmunitid, int processid, int processorid);
        Response<IQueryable<Domain.ProcessReceiptMas>> Loadaddgrid(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed, int colorid, string OrderNo, string ReferNo, int BuyerId);
        Response<IQueryable<Domain.ProcessReceiptDet>> LoadItmgrid(string pid);
        Response<IQueryable<Domain.ProcessReceiptJobdet>> Loadjobdetgrid(string pid);
        Response<bool> CreateUnitEntry(Domain.ProcessReceiptMas MasEntry);
        Response<IQueryable<Domain.ProcessReceiptMas>> LoadMaingrid(int? cmpid, int? processid, int? unitid, int? buyerid, int? masid, int? prodordid, string jobordno, string processortype, string type, string dcno, string recptno, string fromdate, string todate, string orderno, string refno, int? styleid, int? processorid, int Userid);
        Response<IQueryable<Domain.ProcessReceiptDet>> LoadEditItmgrid(int pid);
        Response<IQueryable<Domain.ProcessReceiptJobdet>> LoadEditjobdetgrid(int pid);
        Response<IQueryable<Domain.ProcessReceiptLot>> LoadEditLotdetgrid(int pid);
        Response<IQueryable<Domain.ProcessReceiptDet>> ChkDC(string recpt, int pid);
        Response<bool> DeleteDelEntry(Domain.ProcessReceiptMas DelDEntry);
        Response<bool> UpdateData(Domain.ProcessReceiptMas objupd);
        Response<IQueryable<Domain.ProcessReceiptJobdet>> LoadMainOrderdet(int pid);
        Response<IQueryable<Domain.ProcessReceiptJobdet>> LoadMainOrderstkdet(int pid);
        Response<ProcessReceiptMas> GetDataByRef(string DCNo);
        Response<IQueryable<Domain.ProcessReceiptMas>> GetDataOrderRefDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);
        Response<IQueryable<Domain.ProcessReceiptMas>> GetDataStyleDetails(string Purchase_Type, string Purchase_ItemType, string FrmDate, string ToDate);

        Response<IEnumerable<Domain.ProcessReceiptMas>> Loadaddgrid_Barcode(int cmpid, int cmunitid, int processid, int processorid, string ordtype, string closed, int colorid, string OrderNo, string ReferNo, int BuyerId);
    }
}
