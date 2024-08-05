using AxonApparel.Common;
using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Business
{
    public interface IPaymentBusiness
    {
        Response<IEnumerable<Domain.Bill_Adj_det>> AddList(int Supplierid, int Companyid,string Type);
        Response<IEnumerable<Domain.Bill_Adj_mas>> GetmainList(int Supplierid, int Companyid, string Paymentno, string FromDate, string ToDate, string advance);
        Response<IEnumerable<Domain.Bill_Adj_mas>> GetEditMas(int Transid);
        Response<IEnumerable<Domain.Bill_Adj_det>> GetEditDet(int Transid);
        Response<IEnumerable<Domain.Bill_Adj_mas>> GetPaymentNo(int Companyid);
       
        Response<bool> Create(Bill_Adj_mas objvalue);
        Response<bool> Update(Bill_Adj_mas objvalue);
        Response<bool> Delete(Bill_Adj_mas objvalue);

    }
}
