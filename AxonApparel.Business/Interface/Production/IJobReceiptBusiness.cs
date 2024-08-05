using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IJobReceiptBusiness
    {
        Response<IList<Domain.JobReceiptMain>> GetMaindt(int compid, string orderno, string jobordno, string jobrecptno, int supplierid, string dcno, string refno, int styleid, string entryno, string fromdate, string todate, string UnitorOther);
        Response<IList<Domain.JobReceiptMain>> GetSndGridDet(int compid, string orderno, string jobordno, string jobrecptno, int supplierid, string UnitorOther, string refno);
        Response<IList<Domain.JobReceiptMain>> GetthirdGridDet(string jobordno, string UnitorOther);
        Response<IList<Domain.JobReceiptMain>> GetthirdGridDespatchDet(string Ordno);
        Response<bool> CreateJobRecpt(Domain.JobReceiptMain JobReceptAdd);
        Response<IList<Domain.JobReceiptMain>> GetthirdGridDetonEditMode(int JobRecptId);
        Response<bool> DeleteJobRecpt(int ReceiptId);
        Response<bool> UpdateJobRecpt(Domain.JobReceiptMain JobReceptUpd);
    }
}
