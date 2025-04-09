/**
 * Tiện ích cho QR code trong ứng dụng
 */

/**
 * Tạo URL đầy đủ cho QR code
 * @param path Đường dẫn tương đối
 * @param baseUrl URL cơ sở (tùy chọn)
 * @returns URL đầy đủ
 */
export const getFullUrl = (path: string, baseUrl?: string): string => {
  // Lấy base URL từ tham số hoặc từ biến môi trường
  const site =
    baseUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  // Đảm bảo path bắt đầu bằng /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${site}${normalizedPath}`;
};

/**
 * Tạo URL với tham số truy vấn
 * @param path Đường dẫn
 * @param params Tham số truy vấn
 * @returns URL với tham số
 */
export const createUrlWithParams = (
  path: string,
  params: Record<string, string | number | boolean>
): string => {
  const url = new URL(getFullUrl(path));

  // Thêm các tham số vào URL
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return url.toString();
};

/**
 * Tạo màu QR code dựa trên cấp độ
 * @param level Cấp độ (1-3)
 * @returns Mã màu hex
 */
export const getQRColorByLevel = (level: number): string => {
  switch (level) {
    case 1:
      return "#FF9F1C"; // primary
    case 2:
      return "#41B3A3"; // secondary
    case 3:
      return "#D58BDD"; // accent
    default:
      return "#FF9F1C"; // mặc định là primary
  }
};
