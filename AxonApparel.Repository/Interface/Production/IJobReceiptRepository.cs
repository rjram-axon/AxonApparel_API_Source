using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IJobReceiptRepository
    {
        IList<JobReceiptMain> GetMainData(int compid, string orderno, string jobordno, string jobrecptno, int supplierid, string dcno, string refno, int styleid, string entryno, string fromdate, string todate, string UnitorOther);
        IList<JobReceiptMain> GetSndGridDetails(int compid, string orderno, string jobordno, string jobrecptno, int supplierid, string UnitorOther, string refno);
        IList<JobReceiptMain> GetthirdGridDetails(string jobordno, string UnitorOther);
        IList<JobReceiptMain> GetthirdGridDespatchDetails(string strOrderno);
        bool AddData(JobReceiptMain objAdd);
        IList<JobReceiptMain> GetthirdGridDetailsonEditMode(int JobRecptId);
        bool DeleteJobReceipt(int id);
        bool UpdateData(JobReceiptMain objUpd);
    }
}
