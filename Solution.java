import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<Integer>> fourSum(int[] nums, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums);
        int len = nums.length;
        for (int i = 0; i < len-3; i++) {
            if (nums[i]==nums[i+1]) continue;
            for (int j=i+1; j <len -2; j++){
                if (nums[i]==nums[i+1]) continue;
                int l =j+1;
                int r= len - 1;
                while  (l<=r){
                    int sum = nums[i] + nums[j] + nums[l] + nums[r];
                    if (sum == target){
                        List<Integer> temp = new ArrayList<>();
                        temp.add(nums[i]);
                        temp.add(nums[j]); 
                        temp.add(nums[l]);
                        temp.add(nums[r]);
                        result.add(temp);
                        while (l<r && nums[l] == nums[l+1]) l++;
                        while (l<r && nums[r] == nums[r-1]) r--;
                    }                                             
                }
            }
        }

     }
}