using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface ICSPReceiptRepository
    {
       IQueryable<Domain.CSPReceiptDet> GetAddlist(string ordno, int styleid, int cmpid);
       bool AddDetData(CSPReceiptMas obj, List<CSPReceiptDet> objdet, List<Domain.CSPReceiptDet> objrecdet, string Mode, int unitmId = 0);
       IQueryable<Domain.CSPReceiptMas> LoadMaingrid(int cmpid,int buyerid,int masid,string refno,string ordno,int styleid,string recptno,string fromdate,string todate);
       IQueryable<Domain.CSPReceiptDet> GetEditlist(int masid);
       bool UpdDetData(CSPReceiptMas obj, List<CSPReceiptDet> objdet, List<Domain.CSPReceiptDet> objrecdet, string Mode, int unitmId = 0);
       bool DelDetData(CSPReceiptMas obj, List<CSPReceiptDet> objdet, List<Domain.CSPReceiptDet> objrecdet, string Mode, int unitmId = 0);
       IQueryable<Domain.CSPReceiptMas> GetQltyAddlist(int masid);
       IQueryable<Domain.CSPReceiptDet> GetQltyAdddetlist(int masid);
       bool AddQltyDetData(CSPReceiptMas obj, List<CSPReceiptDet> objdet, List<Domain.CSPReceiptDet> objrecdet, string Mode, int unitmId = 0);
       bool UpdQltyDetData(CSPReceiptMas obj, List<CSPReceiptDet> objdet, List<Domain.CSPReceiptDet> objrecdet, string Mode, int unitmId = 0);
       bool DeleteQltyDetData(CSPReceiptMas obj, List<CSPReceiptDet> objdet, List<Domain.CSPReceiptDet> objrecdet, string Mode, int unitmId = 0);
    }
}
