using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IPaymentRepository
    {
        IEnumerable<Domain.Bill_Adj_det> AddList(int Supplierid, int Companyid,string Type);
        IEnumerable<Domain.Bill_Adj_mas> GetmainList(int Supplierid, int Companyid, string Paymentno, string FromDate, string ToDate, string advance);
        IEnumerable<Domain.Bill_Adj_mas> GetEditMas(int Transid);
        IEnumerable<Domain.Bill_Adj_det> GetEditDet(int Transid);
        IEnumerable<Domain.Bill_Adj_mas> GetPaymentNo(int Companyid);

        bool AddDetData(Repository.BIll_ADJ_mas objAd, List<BIll_Adj_Det> objPDet);
        bool Update(Repository.BIll_ADJ_mas objAd, List<BIll_Adj_Det> objPDet);
        bool Delete(Repository.BIll_ADJ_mas objAd, List<BIll_Adj_Det> objPDet);
    }
}
