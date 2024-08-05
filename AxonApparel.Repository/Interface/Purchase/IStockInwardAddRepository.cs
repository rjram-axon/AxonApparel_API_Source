using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository.Interface
{
    public interface IStockInwardAddRepository
    {
        IQueryable<Domain.StockInward> GetjobordernoDetails(int cmpid);
        IQueryable<Domain.StockInward> GetordernoDetails(int cmpid);
        IQueryable<Domain.StockInward> GetrefnoDetails(int cmpid);
        IQueryable<Domain.StockInward> GetitemgrpDetails(string jobordno);
        IQueryable<Domain.UnitGrnDet> GetLoadgrid(string jobordno);
        IQueryable<Domain.StockInward> GetLoadsupplier();
        IQueryable<Domain.UnitGrnDet> GetLoadonprocess(string jobordno, int pid);
        IQueryable<Domain.UnitGrnDet> GetLoadonitmgrp(string jobordno, int itmid);
        int AddData(Unit_Grn_Mas objEntry);
        bool AddDetData(Unit_Grn_Mas objEntry,List<Unit_Grn_Det> objunitgrnDet, List<ItemStock> objitmstk,string Mode,int unitmId = 0);
        bool UpdDetData(Unit_Grn_Mas objupd, List<Unit_Grn_Det> objunitgrnDet, List<ItemStock> objitmstk, string Mode, int unitmId = 0);
        //bool AddDetData(List<Unit_Grn_Det> objunitgrnDet, string Mode, int unitmId = 0);
        bool GrnDeleteData(int id);
        bool UpdateData(Unit_Grn_Mas objupd);
        IQueryable<Domain.UnitGrnMas> GetLoadgrnnoedit(int mid);
        IQueryable<Domain.UnitGrnMas> GetDataMainList(int URNMasid);
        IQueryable<Domain.UnitGrnMas> GetLoadgrneditdet(string jobordno);
        IQueryable<Domain.UnitGrnDet> GetLoadgrid(int mid,string jobordno,string type);
    }
}
