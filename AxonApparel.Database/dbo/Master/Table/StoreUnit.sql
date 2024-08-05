CREATE TABLE [dbo].[StoreUnit]
(

    [StoreUnitID] [int] IDENTITY(1,1) NOT NULL,
	[StoreName] [varchar](40) NOT NULL,
	[StoreType] [varchar](2) NOT NULL,
	[ParentUnitID] [int] NOT NULL,
	[ParentUnitType] [varchar](2) NOT NULL,
	[IsActive] [bit] NOT NULL DEFAULT (1), 
    CONSTRAINT [PK_StoreUnit] PRIMARY KEY ([StoreUnitID]), 
    CONSTRAINT [CK_StoreUnit_ParentUnitType] CHECK (([ParentUnitType] = 'CP' or [ParentUnitType] = 'MS' or [ParentUnitType] = 'PU' or [ParentUnitType] = 'WD')), 
    CONSTRAINT [CK_StoreUnit_StoreType] CHECK (([StoreType] = 'MS' or [StoreType] = 'SS' or [StoreType] = 'SC'))
 
)
