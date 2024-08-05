using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
   public interface IProcessQualityRepository
    {
       IList<Domain.ProcQltyDet> GetEntryItemLoad(int RecptMasid);
       IList<Domain.ProcQltyJobDet> GetEntryJobDetLoad(int RecptMasid);
       IList<Domain.ProcQltyStock> GetEntryStockLoad(int RecptMasid);
       bool Add(Process_Qlty_mas obj, List<Process_Qlty_det> objdet, List<Process_Qlty_Jobdet> objobdet, List<Process_Qlty_Stock> objstkdet, List<Process_Qlty_DrCr> drcrdet, string Mode);

       IQueryable<Domain.ProcQltyMas> GetDataRepQltyEditDetails(int Id);
       IList<Domain.ProcQltyJobDet> GetRepEntryQltyEditItemLoad(int RecptMasid);
       IList<Domain.ProcQltyStock> GetRepQltyEditStockLoad(int RecptMasid);

       bool UpdateData(Process_Qlty_mas Uobj, List<Process_Qlty_det> Uobjdet, List<Process_Qlty_Jobdet> Uobjobdet, List<Process_Qlty_Stock> Uobjstkdet, List<Process_Qlty_DrCr> Udrcrdet, string Mode);
       bool DeleteData(Process_Qlty_mas Dobj, List<Process_Qlty_det> Dobjdet, List<Process_Qlty_Jobdet> Dobjobdet, List<Process_Qlty_Stock> Dobjstkdet, List<Process_Qlty_DrCr> Ddrcrdet, string Mode);
    }
}
