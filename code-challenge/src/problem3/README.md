// CODE CHƯA SỬA
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};

// CODE ĐÃ SỬA
interface WalletBalance {
  blockchain: BlockchainType | string;
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

type BlockchainType = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

const getPriority = (blockchain: BlockchainType | string): number => {
  const priorities: Record<BlockchainType, number> = {
    Osmosis: 100,
    Ethereum: 50,
    Arbitrum: 30,
    Zilliqa: 20,
    Neo: 20,
  };
  return priorities[blockchain as BlockchainType] ?? -99;
};

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const filteredBalances = useMemo(
    () =>
      balances.filter(
        (balance) =>
          getPriority(balance.blockchain) > -99 && balance.amount <= 0
      ),
    [balances]
  );

  const sortedBalances = useMemo(
    () =>
      [...filteredBalances].sort(
        (lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      ),
    [filteredBalances]
  );

  const formattedBalances = useMemo(
    () =>
      sortedBalances.map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      })),
    [sortedBalances]
  );

  const rows = formattedBalances.map((balance, index) => {
    const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        key={balance.currency + index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};

// GHI CHÚ CÁC DÒNG ĐÃ SỬA:
// 1. Thay `blockchain: any` bằng `blockchain: BlockchainType | string` để đảm bảo type safety.
// 2. Thêm kiểu BlockchainType và sử dụng Record để ánh xạ trực tiếp ưu tiên blockchain.
// 3. Sửa lỗi `lhsPriority` thành `balancePriority` trong filter function.
// 4. Tách `useMemo` thành 3 phần: lọc, sắp xếp, và định dạng dữ liệu để tối ưu performance.
// 5. Thêm kiểm tra `prices[balance.currency] ?? 0` để tránh lỗi `undefined`.
// 6. Thay `key={index}` bằng `key={balance.currency + index}` để tránh trùng key khi render danh sách.
